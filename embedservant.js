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
			getskillfunctions(servant.skills.findLast(e => e.num === 1)),
			getskillfunctions(servant.skills.findLast(e => e.num === 2)),
			getskillfunctions(servant.skills.findLast(e => e.num === 3)),
			getNoblePhantasm(servant.noblePhantasms),

		],


	};
	return embedservant;

}

function getskillfunctions(skill) {
	let replyText = `__${skill.detail}__ \n`;

	for (let i = 0; i < skill.functions.length; i++) {
		if (skill.functions[i].svals[0].Value === undefined && skill.functions[i].funcTargetTeam !== 'enemy') {
			replyText += `\n${skill.functions[i].funcPopupText} `;
		}
		else if (skill.functions[i].funcTargetTeam !== 'enemy') {
			replyText += `\n***${skill.functions[i].funcPopupText}*** : ${skill.functions[i].svals[0].Value}/${skill.functions[i].svals[9].Value}`;
		}
	}
	return {
		name: skill.name,
		value: replyText };
}
function getNoblePhantasm(NP) {
	let replyText = '__***\n Noble Phantasm:***__';
	for (let i = 0; i < NP.length; i++) {
		replyText += `\n\n\n**NP Type**: *${NP[i].card.toUpperCase()}*\n**Details**: __${NP[i].detail}__`;
		for (let j = 0; j < NP[i].functions.length; j++) {
			if (NP[i].functions[j].svals[0].Value === undefined && NP[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n**${NP[i].functions[j].funcPopupText}**`;
				if (NP[i].functions[j].svals[0].Count !== -1 && NP[i].functions[j].svals[0].Count !== undefined) {
					replyText += `(${NP[i].functions[j].svals[0].Count}/${NP[i].functions[j].svals2[1].Count}/${NP[i].functions[j].svals3[2].Count}/${NP[i].functions[j].svals4[3].Count}/${NP[i].functions[j].svals5[4].Count})`;
				}
			}
			else if (NP[i].functions[j].funcTargetTeam !== 'enemy') {
				replyText += `\n**${NP[i].functions[j].funcPopupText}**: *${NP[i].functions[j].svals[0].Value}/${NP[i].functions[j].svals2[1].Value}/${NP[i].functions[j].svals3[2].Value}/${NP[i].functions[j].svals4[3].Value}/${NP[i].functions[j].svals5[4].Value}*`;
				if (NP[i].functions[j].svals[0].Count !== -1 && NP[i].functions[j].svals[0].Count !== undefined) {
					replyText += `(${NP[i].functions[j].svals[0].Count}/${NP[i].functions[j].svals2[1].Count}/${NP[i].functions[j].svals3[2].Count}/${NP[i].functions[j].svals4[3].Count}/${NP[i].functions[j].svals5[4].Count})`;
				}

			}

		}
	}
	return { name: NP[0].name,
		value: replyText };
}
module.exports = {
	makeEmbedServant,

};

