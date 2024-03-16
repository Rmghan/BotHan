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
			if (buffNameList[state.functions[j].funcPopupText]) {
				replyText += `\n* ***${state.functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${state.functions[j].svals[0].Value}`;
				if (state.functions[j].svals[9] !== undefined) {
					replyText += `/${(state.functions[j].svals[9].Value)}`;
				}
			}
			else if (npGainBuff[state.functions[j].funcPopupText]) {
				replyText += `\n* ***${state.functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${(state.functions[j].svals[0].Value) / 100}%/${(state.functions[j].svals[9].Value) / 100}%`;
			}
			else if (state.functions[j].svals[0].Value < 100000) {
				replyText += `\n* ***${state.functions[j].funcPopupText.replace(/\n/g, ' ')}*** : ${(state.functions[j].svals[0].Value) / 10}%`;
				// check if the svals[9] exists before adding it to the skills.
				if (state.functions[j].svals[9] !== undefined) {
					replyText += `/${(state.functions[j].svals[9].Value) / 10}%`;
				}
			}
			else {
				replyText += await StateSkill(state.functions[j].svals[0].Value);
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

function getSkillFuncText({ skill, i, j }) {
	return skill[i].functions[j].funcPopupText.replace(/\n/g, ' ');
}
function getSkillTargetTeam({ skill, i, j }) {
	return skill[i].functions[j].funcTargetTeam;
}
function getSkillValue({ i, j, skill, level }) {
	return skill[i].functions[j].svals[level].Value;
}
async function getSkillFunctions(skill) {
	const replyFields = [];
	for (let i = 0; i < skill.length; i++) {
		let replyText = `__${skill[i].detail}__ \n`;
		for (let j = 0; j < skill[i].functions.length; j++) {
			const funcName = getSkillFuncText({ skill, i, j });
			const funcTargetTeam = getSkillTargetTeam ({ i, j, skill });
			const skillLvl1Value = getSkillValue({ i, j, skill, level: 0 });
			const skillLvl10Value = getSkillValue({ i, j, skill, level: 9 });
			if (skillLvl1Value === undefined && funcTargetTeam !== 'enemy') {
				replyText += `\n* ${funcName}`;
			}
			else if (funcTargetTeam !== 'enemy') {
				// add ifs and comparative statements with the Constants.js (use includes() function, to fix the value problems)
				if (buffNameList[funcName]) {
					replyText += `\n* ***${funcName}*** : ${skillLvl1Value}/${skillLvl10Value}`;
				}
				else if (npGainBuff[funcName]) {
					replyText += `\n* ***${funcName}*** : ${(skillLvl1Value) / 100}%/${(skillLvl10Value) / 100}%`;
				}
				else if (skillLvl1Value < 100000) {
					replyText += `\n* ***${funcName}*** : ${(skillLvl1Value) / 10}%/${(skillLvl10Value) / 10}%`;
				}
				else if (servantStateIDs.includes(skillLvl1Value.toString()) == false) {
					replyText += await StateSkill(skillLvl1Value);
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
			const funcName = getSkillFuncText({ skill, i, j });
			const skillLvl1Value = getSkillValue({ i, j, skill, level: 0 });
			if (skillLvl1Value === undefined && skill[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n* ${funcName}`;
			}
			else if (skill[i].functions[j].funcTargetTeam !== 'enemy') {
			// add ifs and comparative statements with the Constants.js (use includes() function, to fix the value problems)
				if (buffNameList[funcName]) {
					replyText += `* *${funcName}* : **${skillLvl1Value}**\n`;
				}
				else if (npGainBuff[funcName]) {
					replyText += `* *${funcName}* : **${(skillLvl1Value) / 100}%**\n`;
				}
				else {
					replyText += `* *${funcName}* : **${(skillLvl1Value) / 10}%**\n`;
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
			// first if to deal with invul/evade and other related buffs that don't have any values.
			if (NP[i].functions[j].svals[0].Value === undefined && NP[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n* **${NP[i].functions[j].funcPopupText.replace(/\n/g, ' ')}**`;
				if (NP[i].functions[j].svals[0].Count !== -1 && NP[i].functions[j].svals[0].Count !== undefined) {
					replyText += `(${NP[i].functions[j].svals[0].Count}/${NP[i].functions[j].svals2[1].Count}/${NP[i].functions[j].svals3[2].Count}/${NP[i].functions[j].svals4[3].Count}/${NP[i].functions[j].svals5[4].Count})`;
				}
			}
			// Everything other than invul/evade/non-Value owning buffs go here.
			else if (NP[i].functions[j].funcTargetTeam !== 'enemy') {
				// This If checks for all values that are 1x of themselves, e.g Heals etc.
				if (buffNameList[NP[i].functions[j].funcPopupText]) {
					replyText += `\n* **${NP[i].functions[j].funcPopupText.replace(/\n/g, ' ')}**: *${NP[i].functions[j].svals[0].Value}/${NP[i].functions[j].svals2[1].Value}/${NP[i].functions[j].svals3[2].Value}/${NP[i].functions[j].svals4[3].Value}/${NP[i].functions[j].svals5[4].Value}*`;
				}
				// This If checks for all values that are 100x of themselves e.g NP batteries.
				else if (npGainBuff[NP[i].functions[j].funcPopupText]) {
					replyText += `\n* **${NP[i].functions[j].funcPopupText.replace(/\n/g, ' ')}**: *${(NP[i].functions[j].svals[0].Value) / 100}%/${(NP[i].functions[j].svals2[1].Value) / 100}%/${(NP[i].functions[j].svals3[2].Value) / 100}%/${(NP[i].functions[j].svals4[3].Value) / 100}%/${(NP[i].functions[j].svals5[4].Value) / 100}%*`;

				}
				// This is where everything else, excluding the State buffs go into.
				else {
					if (NP[i].functions[j].funcPopupText === 'None') {
						replyText += '\n* **DMG**: ';
					}
					else {replyText += `\n* **${NP[i].functions[j].funcPopupText.replace(/\n/g, ' ')}**: `;}
					replyText += `*${(NP[i].functions[j].svals[0].Value) / 10}%/${(NP[i].functions[j].svals2[1].Value) / 10}%/${(NP[i].functions[j].svals3[2].Value) / 10}%/${(NP[i].functions[j].svals4[3].Value) / 10}%/${(NP[i].functions[j].svals5[4].Value) / 10}%*`;

				}
				// This one is to handle the Count-related buffs e.g Castoria's solemn Defense stacks that ramp with NP OC.
				if (NP[i].functions[j].svals[0].Count !== -1 && NP[i].functions[j].svals[0].Count !== undefined) {
					replyText += `(${NP[i].functions[j].svals[0].Count}/${NP[i].functions[j].svals2[1].Count}/${NP[i].functions[j].svals3[2].Count}/${NP[i].functions[j].svals4[3].Count}/${NP[i].functions[j].svals5[4].Count})`;
				}
				// if (NP[i].functions[j].svals[0].)

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