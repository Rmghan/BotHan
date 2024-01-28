let embedobject = null;

async function makeEmbedObject(x) {
	const skill1 = x.skills.findLast(e => e.num === 1);
	const skill2 = x.skills.findLast(e => e.num === 2);
	const skill3 = x.skills.findLast(e => e.num === 3);
	const skill1functions = await getskillfunctions(skill1);
	const skill2functions = await getskillfunctions(skill2);
	const skill3functions = await getskillfunctions(skill3);

	embedobject = {
		title:  x.name,
		thumbnail: { url: x.extraAssets.faces.ascension[2] },
		description: `${x.rarity}* ${(x.className).toUpperCase()}`,
		fields: [
			{
				name : 'Servant Atk:',
				value: `${x.atkBase}/${x.atkMax}`,
				inline: true,
			},
			{
				name: 'Servant HP:',
				value: `${x.hpBase}/${x.hpMax}`,
				inline: true,

			},
			{
				name: 'Attribute:',
				value: x.attribute,
				inline: true,
			},
			{
				name:  '\u200B',
				value: '\u200B',
			},
			{
				name: skill1.name,
				value: `Details: ${skill1.detail} \n ${ skill1functions.map(i => (`\n ${i.functionName}(${i.functionTeam}): ${i.functionMinVal}/${i.functionMaxVal}`))} `,
			},
			{
				name: skill2.name,
				value: `Details: ${skill2.detail} \n ${ skill2functions.map(i => (`\n ${i.functionName}(${i.functionTeam}): ${i.functionMinVal}/${i.functionMaxVal}`))} `,
			},
			{
				name: skill3.name,
				value: `Details: ${skill3.detail} \n ${ skill3functions.map(i => (`\n ${i.functionName}(${i.functionTeam}): ${i.functionMinVal}/${i.functionMaxVal}`))}`,
			},


		],


	};
	return embedobject;

}

async function getskillfunctions(x) {
	const skillfunctions = x.functions.map(i => ({ functionName: i.funcPopupText, functionTeam: i.funcTargetTeam, functionMinVal: i.svals[0].Value, functionMaxVal: i.svals[9].Value }));
	return skillfunctions;
}

module.exports = {
	makeEmbedObject,

};

