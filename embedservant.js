let embedservant = null;

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
			//			getSkillFunctions(servant.skills.findLast(e => e.num === 1)),
			//			getSkillFunctions(servant.skills.findLast(e => e.num === 2)),
			//			getSkillFunctions(servant.skills.findLast(e => e.num === 3)),
			//			...getNoblePhantasm(servant.noblePhantasms),

		],


	};
	return embedservant;

}

function getSkillFunctions(skill) {
	const replyFields = [];
	for (let i = 0; i < skill.length; i++) {
		let replyText = `__${skill[i].detail}__ \n`;
		for (let j = 0; j < skill[i].functions.length; j++) {
			if (skill[i].functions[j].svals[0].Value === undefined && skill[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n${skill[i].functions[j].funcPopupText}`;
			}
			else if (skill[i].functions[j].funcTargetTeam !== 'enemy') {
				// add ifs and comparative statements with the Constants.js (use includes() function, to fix the value problems)
				replyText += `\n***${skill[i].functions[j].funcPopupText}*** : ${skill[i].functions[j].svals[0].Value}/${skill[i].functions[j].svals[9].Value}`;
			}
		}

		replyFields.push({ name: skill[i].name, value: replyText });
	}
	return replyFields;
}

function getNoblePhantasm(NP) {
	const replyFields = [];
	for (let i = 0; i < NP.length; i++) {
		let replyText = '__***\n Noble Phantasm:***__';
		replyText += `\n\n\n**NP Type**: *${NP[i].card.toUpperCase()}* \n**Details**: __${NP[i].detail}__`;
		for (let j = 0; j < NP[i].functions.length; j++) {
			if (NP[i].functions[j].svals[0].Value === undefined && NP[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n **${NP[i].functions[j].funcPopupText}**`;
				if (NP[i].functions[j].svals[0].Count !== -1 && NP[i].functions[j].svals[0].Count !== undefined) {
					replyText += `(${NP[i].functions[j].svals[0].Count}/${NP[i].functions[j].svals2[1].Count}/${NP[i].functions[j].svals3[2].Count}/${NP[i].functions[j].svals4[3].Count}/${NP[i].functions[j].svals5[4].Count})`;
				}
			}
			else if (NP[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n **${NP[i].functions[j].funcPopupText}**: *${NP[i].functions[j].svals[0].Value}/${NP[i].functions[j].svals2[1].Value}/${NP[i].functions[j].svals3[2].Value}/${NP[i].functions[j].svals4[3].Value}/${NP[i].functions[j].svals5[4].Value}*`;
				if (NP[i].functions[j].svals[0].Count !== -1 && NP[i].functions[j].svals[0].Count !== undefined) {
					replyText += `(${NP[i].functions[j].svals[0].Count}/${NP[i].functions[j].svals2[1].Count}/${NP[i].functions[j].svals3[2].Count}/${NP[i].functions[j].svals4[3].Count}/${NP[i].functions[j].svals5[4].Count})`;
				}

			}

		}
		replyFields.push({ name: NP[i].name,
			value: replyText });

	}
	return replyFields;
}

function servantSkill1Embed(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...getSkillFunctions(servant.skills.filter(e => e.num === 1)),
		],
	};
	return embedservant;
}
function servantSkill2Embed(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...getSkillFunctions(servant.skills.filter(e => e.num === 2)),
		],
	};
	return embedservant;
}
function servantSkill3Embed(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...getSkillFunctions(servant.skills.filter(e => e.num === 3)),
		],
	};
	return embedservant;
}
function servantNP(servant) {
	embedservant = {
		title:  servant.name,
		thumbnail: { url: servant.extraAssets.faces.ascension[2] },
		description: `${servant.rarity}* ${(servant.className).toUpperCase()}`,
		fields: [
			...getNoblePhantasm(servant.noblePhantasms),
		],
	};
	return embedservant;
}
module.exports = {
	makeEmbedServant, servantSkill1Embed, servantSkill2Embed, servantSkill3Embed, servantNP };