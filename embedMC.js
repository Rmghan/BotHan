let embedobject = null;

async function makeEmbedMC(Mystic_Code) {

	embedobject = {
		title:  Mystic_Code.name,
		thumbnail: { url: Mystic_Code.extraAssets.item.male },
		description: `${Mystic_Code.detail}`,
		fields: [
			getskillfunctions(Mystic_Code.skills[0]),
			getskillfunctions(Mystic_Code.skills[1]),
			getskillfunctions(Mystic_Code.skills[2]),


		],


	};
	return embedobject;

}


function getskillfunctions(skill) {
	let replyText = `${skill.detail}`;
	for (let i = 0; i < skill.functions.length; i++) {
		if (skill.functions[i].svals[0].Value === undefined) {
			replyText += `\n ${skill.functions[i].funcPopupText} `;
		}
		else {
			replyText += `\n ${skill.functions[i].funcPopupText}: ${skill.functions[i].svals[0].Value}/${skill.functions[i].svals[9].Value}`;
		}
	}
	return {
		name: skill.name,
		value: replyText };

}

module.exports = {
	makeEmbedMC,

};

