const {mygroup} = require('./models/my-group.model');

function getAll (req, res) {
    console.log(`[GET]: http://localhost:5000/`);
    res.status(200).json(mygroup);
}

function addOne(req, res){
    const mssv = Number(req.params.MSSV);
    const ID = Number(req.params.id)
    console.log(`[POST]: http://localhost:5000/${mssv}/${ID}`);
    const oldgroupMember = mygroup[ID]
    
    
    if(oldgroupMember){
        return res.status(400).json({
            error: 'not valid'
        })
    }
    if(!req.body.name){
        return res.status(400).json({
            error: 'name is required'
        })
    }
    const newGroupMember = {id: mssv, name: req.body.name}
    mygroup.push(newGroupMember)
    res.status(200).json(newGroupMember);
}
function getById(req, res){
    const ID = Number(req.params.id)
    console.log(`[GET]: http://localhost:5000/${ID}`);
    if(ID >= 0 && ID < mygroup.length){
        const groupMember = mygroup[ID]
        if (groupMember) {
            res.status(200).json(groupMember);
        }
    }else {
        res.status(400).json({error:'Not valid'});
    }
}
function getMessageById(req, res){
    const ID = Number(req.params.id)
    console.log(`[GET]: http://localhost:5000/message/${ID}`);
    if(!ID){
        let body 
        for(groupMember of mygroup){
           body += `<html><body><ul><li> ${groupMember.name}</li></ul></body></html>`
        }
        res.send(body)
    }
    if(ID >= 0 && ID < mygroup.length ){
        const groupMember = mygroup[ID]
        let body = `<html><body><ul><li> ${groupMember.name}</li></ul></body></html>`
        res.send(body)
    }else {
        res.status(400).json({error:'Not valid'});
    }
}


module.exports = {
   getAll, 
   addOne,
   getById, 
   getMessageById
}