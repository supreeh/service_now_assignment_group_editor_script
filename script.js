var groupsToChange = {
    "GroupName":	"GroupName_Changed"
 
};

function changeName(groupName) {

    var oldPrefix = "GroupName";
    var newPrefix = "Changed";

    if (groupsToChange[groupName] !== undefined)
        return groupsToChange[groupName];

    if (groupName.indexOf(oldPrefix) === 0)
        return newPrefix + groupName.substring(oldPrefix.length);

    return groupName;
}
var groupsToCreate = [
    "GroupToCreate"
];
for (var i = 0; i < groupsToCreate.length; i++) {

    var groupName = groupsToCreate[i];

    var gr_create = new GlideRecord('sys_user_group');
    gr_create.addQuery('name', groupName);
    gr_create.query();
    if (!gr_create.next()) {

        var newGroup = new GlideRecord('sys_user_group');
        newGroup.initialize();

        newGroup.name = groupName;

        var sysId = newGroup.insert();

        gs.info("CREATE GROUP: " + groupName + " | " + sysId);

    } else {
        gs.info("GROUP ALREADY EXISTS: " + groupName);
    }
}    

var groupsToDelete = [
    "GroupToDelete_001",
    "GroupToDelete_002",
    "GroupToDelete_003"
];

var gr_delete = new GlideRecord('sys_user_group');
gr_delete.query();

while (gr_delete.next()) {

    var name = gr_delete.name.toString().trim();

    if (groupsToDelete.indexOf(name) > -1) {
        gs.info("DELETE GROUP: " + name + " | " + gr_delete.sys_id);

    gr_delete.setWorkflow(false);
    gr_delete.deleteRecord();
    }
}

var gr_change = new GlideRecord('sys_user_group');
gr_change.query();

while (gr_change.next()) {

    var newName = changeName(gr_change.name.toString());

    if (newName != gr_change.name.toString()) {

        gs.info(gr_change.name + " >>>CHANGED TO>>> " + newName);
    
    gr_change.setWorkflow(false);
    gr_change.name = newName;
    gr_change.update();
    }
}