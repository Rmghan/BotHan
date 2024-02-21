const { buffNameList, npGainBuff, servantStateIDs } = require('./constants');
const { getStateJson } = require('./fetch');

let embedservant = null;

async function StateSkill(stateID) {
	const state = await getStateJson(stateID);
	let replyText = '';
	for (let j = 0; j < state.functions.length; j++) {
		if (state.functions[j].svals[0].Value === undefined && state.functions[j].funcTargetTeam !== 'enemy') {
			replyText += `\n* ${state.functions[j].funcPopupText.replace(/\n/g, ' ')}`;
		}
		else if (state.functions[j].funcTargetTeam !== 'enemy') {
		// add ifs and comparative statements with the Constants.js (use includes() function, to fix the value problems)
			if (buffNameList.includes(state.functions[j].funcPopupText) == true) {
				replyText += `\n* ***${state.functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${state.functions[j].svals[0].Value}/${state.functions[j].svals[9].Value}`;
			}
			else if (npGainBuff.includes(state.functions[j].funcPopupText) == true) {
				replyText += `\n* ***${state.functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${(state.functions[j].svals[0].Value) / 100}%/${(state.functions[j].svals[9].Value) / 100}%`;
			}
			else {
				replyText += `\n* ***${state.functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${(state.functions[j].svals[0].Value) / 10}%/${(state.functions[j].svals[9].Value) / 10}%`;
			}
		}
	}
	return replyText;

}


function makeEmbedServant(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			{
				name : 'Servant Atk:',
				value: `${servant.atkBase}/${servant.atkMax}`,
				inline: true,
			},
			{
				name: 'Servant HP:',
				value: `${servant.hpBase}/${servant.hpMax}`,
				inline: true,

			},
			{
				name: 'Attribute:',
				value: servant.attribute,
				inline: true,
			},
			{
				name:  '\u200B',
				value: '\u200B',
			},
		],


	};
	return embedservant;

}

async function getSkillFunctions(skill) {
	const replyFields = [];
	for (let i = 0; i < skill.length; i++) {
		let replyText = `__${skill[i].detail}__ \n`;
		for (let j = 0; j < skill[i].functions.length; j++) {
			if (skill[i].functions[j].svals[0].Value === undefined && skill[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n* ${skill[i].functions[j].funcPopupText.replace(/\n/g, ' ')}`;
			}
			else if (skill[i].functions[j].funcTargetTeam !== 'enemy') {
				// add ifs and comparative statements with the Constants.js (use includes() function, to fix the value problems)
				if (buffNameList.includes(skill[i].functions[j].funcPopupText) == true) {
					replyText += `\n* ***${skill[i].functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${skill[i].functions[j].svals[0].Value}/${skill[i].functions[j].svals[9].Value}`;
				}
				else if (npGainBuff.includes(skill[i].functions[j].funcPopupText) == true) {
					replyText += `\n* ***${skill[i].functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${(skill[i].functions[j].svals[0].Value) / 100}%/${(skill[i].functions[j].svals[9].Value) / 100}%`;
				}
				else if (skill[i].functions[j].svals[0].Value <= 100000) {
					replyText += `\n* ***${skill[i].functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${(skill[i].functions[j].svals[0].Value) / 10}%/${(skill[i].functions[j].svals[9].Value) / 10}%`;
				}
				else if (servantStateIDs.includes(skill[i].functions[j].svals[0].Value.toString()) == false) {
					replyText += await StateSkill(skill[i].functions[j].svals[0].Value);
				}
			}
		}

		replyFields.push({ name: skill[i].name, value: replyText });
	}
	return replyFields;
}
function getclassPassive(skill) {
	const replyFields = [];
	for (let i = 0; i < skill.length; i++) {
		let replyText = `\n${skill[i].detail}\n`;
		for (let j = 0; j < skill[i].functions.length; j++) {
			if (skill[i].functions[j].svals[0].Value === undefined && skill[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n* ${skill[i].functions[j].funcPopupText.replace(/\n/g, ' ')}`;
			}
			else if (skill[i].functions[j].funcTargetTeam !== 'enemy') {
			// add ifs and comparative statements with the Constants.js (use includes() function, to fix the value problems)
				if (buffNameList.includes(skill[i].functions[j].funcPopupText) == true) {
					replyText += `* *${skill[i].functions[j].funcPopupText.replace(/\n/g, ' ')}* : **${skill[i].functions[j].svals[0].Value}**\n`;
				}
				else if (npGainBuff.includes(skill[i].functions[j].funcPopupText) == true) {
					replyText += `* *${skill[i].functions[j].funcPopupText.replace(/\n/g, ' ')}* : **${(skill[i].functions[j].svals[0].Value) / 100}%**\n`;
				}
				else {
					replyText += `* *${skill[i].functions[j].funcPopupText.replace(/\n/g, ' ')}* : **${(skill[i].functions[j].svals[0].Value) / 10}%**\n`;
				}
			}


		}
		replyFields.push({ name: `\n__${skill[i].name}__`, value: replyText });

	}
	return replyFields;
}
async function getNoblePhantasm(NP) {
	const replyFields = [];
	for (let i = 0; i < NP.length; i++) {
		let replyText = `**Rank**: ${NP[i].rank}`;
		replyText += `\n**NP Type**: *${NP[i].card.toUpperCase()}* \n**Details**: __${NP[i].detail}__\n`;
		for (let j = 0; j < NP[i].functions.length; j++) {
			if (NP[i].functions[j].svals[0].Value === undefined && NP[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n* **${NP[i].functions[j].funcPopupText.replace(/\n/g, ' ')}**`;
				if (NP[i].functions[j].svals[0].Count !== -1 && NP[i].functions[j].svals[0].Count !== undefined) {
					replyText += `(${NP[i].functions[j].svals[0].Count}/${NP[i].functions[j].svals2[1].Count}/${NP[i].functions[j].svals3[2].Count}/${NP[i].functions[j].svals4[3].Count}/${NP[i].functions[j].svals5[4].Count})`;
				}
			}
			else if (NP[i].functions[j].funcTargetTeam !== 'enemy') {
				if (buffNameList.includes(NP[i].functions[j].funcPopupText) == true) {
					replyText += `\n* **${NP[i].functions[j].funcPopupText.replace(/\n/g, ' ')}**: *${NP[i].functions[j].svals[0].Value}/${NP[i].functions[j].svals2[1].Value}/${NP[i].functions[j].svals3[2].Value}/${NP[i].functions[j].svals4[3].Value}/${NP[i].functions[j].svals5[4].Value}*`;
				}
				else if (npGainBuff.includes(NP[i].functions[j].funcPopupText) == true) {
					replyText += `\n* **${NP[i].functions[j].funcPopupText.replace(/\n/g, ' ')}**: *${(NP[i].functions[j].svals[0].Value) / 100}%/${(NP[i].functions[j].svals2[1].Value) / 100}%/${(NP[i].functions[j].svals3[2].Value) / 100}%/${(NP[i].functions[j].svals4[3].Value) / 100}%/${(NP[i].functions[j].svals5[4].Value) / 100}%*`;

				}
				else {
					if (NP[i].functions[j].funcPopupText === 'None') {
						replyText += '\n* **DMG**: ';
					}
					else {replyText += `\n* **${NP[i].functions[j].funcPopupText.replace(/\n/g, ' ')}**: `;}
					replyText += `*${(NP[i].functions[j].svals[0].Value) / 10}%/${(NP[i].functions[j].svals2[1].Value) / 10}%/${(NP[i].functions[j].svals3[2].Value) / 10}%/${(NP[i].functions[j].svals4[3].Value) / 10}%/${(NP[i].functions[j].svals5[4].Value) / 10}%*`;

				}
				if (NP[i].functions[j].svals[0].Count !== -1 && NP[i].functions[j].svals[0].Count !== undefined) {
					replyText += `(${NP[i].functions[j].svals[0].Count}/${NP[i].functions[j].svals2[1].Count}/${NP[i].functions[j].svals3[2].Count}/${NP[i].functions[j].svals4[3].Count}/${NP[i].functions[j].svals5[4].Count})`;
				}

			}

		}
		replyFields.push({ name: `__${NP[i].name}__`,
			value: replyText });

	}
	return replyFields;
}

async function servantSkill1Embed(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...await getSkillFunctions(servant.skills.filter(e => e.num === 1)),
		],
	};
	return embedservant;
}
async function servantSkill2Embed(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...await getSkillFunctions(servant.skills.filter(e => e.num === 2)),
		],
	};
	return embedservant;
}
async function servantSkill3Embed(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...await getSkillFunctions(servant.skills.filter(e => e.num === 3)),
		],
	};
	return embedservant;
}
async function servantNP(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...await getNoblePhantasm(servant.noblePhantasms),
		],
	};
	return embedservant;
}
function makePassiveEmbed(servant) {
	embedservant = {
		title: servant.name,
		thumbnail:{ url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...getclassPassive(servant.classPassive),
		],
	};
	return embedservant;
}
module.exports = {
	makeEmbedServant, servantSkill1Embed, servantSkill2Embed, servantSkill3Embed, servantNP, makePassiveEmbed, getSkillFunctions };