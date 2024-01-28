let embedobject = null;

async function makeEmbedMC(x) {
	const skill1 = x.skills[0];
	const skill2 = x.skills[1];
	const skill3 = x.skills[2];
	const skill1functions = await getskillfunctions(skill1);
	const skill2functions = await getskillfunctions(skill2);
	const skill3functions = await getskillfunctions(skill3);

	embedobject = {
		title:  x.name,
		thumbnail: { url: x.extraAssets.item.male },
		description: `${x.detail}`,
		fields: [
			{
				name: skill1.name,
				value: `Details: ${skill1.detail} \n ${ skill1functions.map(i => (`\n ${i.functionName}: ${i.functionMinVal}/${i.functionMaxVal}`))} `,
			},
			{
				name: skill2.name,
				value: `Details: ${skill2.detail} \n ${ skill2functions.map(i => (`\n ${i.functionName}: ${i.functionMinVal}/${i.functionMaxVal}`))} `,
			},
			{
				name: skill3.name,
				value: `Details: ${skill3.detail} \n ${ skill3functions.map(i => (`\n ${i.functionName}: ${i.functionMinVal}/${i.functionMaxVal}`))}`,
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
	makeEmbedMC,

};

