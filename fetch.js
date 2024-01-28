// Servant ID:NAME pair storage array code block
const servantStoreURL = 'https://api.atlasacademy.io/export/NA/nice_servant.json';
const commandCodeStoreURL = 'https://api.atlasacademy.io/export/NA/nice_command_code.json';
const craftEssenceStoreURL = 'https://api.atlasacademy.io/export/NA/nice_equip.json';
const mysticCodeStoreURL = 'https://api.atlasacademy.io/export/NA/nice_mystic_code.json';
let craftEssenceList = null;
let servantList = null;
let commandCodeList = null;
let mysticCodeList = null;
async function getServantList() {
	if (!servantList) {
		servantList = await fetch(servantStoreURL).then(response => response.json());
	}
	return servantList;
}

async function getCeList() {
	if (!craftEssenceList) {
		craftEssenceList = await fetch(craftEssenceStoreURL).then(response => response.json());
	}
	return craftEssenceList;

}

async function getCCList() {
	if (!commandCodeList) {
		commandCodeList = await fetch(commandCodeStoreURL).then(response => response.json());
	}
	return commandCodeList;

}
async function getMysticCodeList() {
	if (!mysticCodeList) {
		mysticCodeList = await fetch(mysticCodeStoreURL).then(response => response.json());
	}
	return mysticCodeList;

}


module.exports = {
	getServantList,
	getCeList,
	getCCList,
	getMysticCodeList,
};
