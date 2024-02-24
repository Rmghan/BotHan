const { getSkillFunctions } = require('./embedservant');

let embedobject = null;

async function makeEmbedMC(Mystic_Code) {

	embedobject = {
		title:  Mystic_Code.name,
		thumbnail: { url: Mystic_Code.extraAssets.item.male },
		description: `${Mystic_Code.detail}`,
		fields: [...getSkillFunctions(Mystic_Code.skills.filter(e => e.num === 0))],
	};
	return embedobject;
}

module.exports = { makeEmbedMC };

