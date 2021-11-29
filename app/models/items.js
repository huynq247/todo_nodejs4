const MainModel = require (__path_schemas + 'items');

module.exports = {

    listItems : (params, option) => {
        let sort = {};
        let objwhere = {};
        if (params.keyword !=='') objwhere.name = new RegExp(params.keyword, 'i');
        if (params.sortField) sort[params.sortField] = params.sortType;

        if(option.task == 'all'){
            return MainModel.find(objwhere)
                            .select('name status')
                            .sort(sort)
        }
        else if(option.task == 'one'){
            return MainModel.find({_id: params})
                            .select('name status')
        }
    },

    create: (item) => {
        return MainModel(item).save();
    },

    deleteItems : (params, option) => {

        if(option.task == 'one'){
            return MainModel.deleteOne({_id : params.id})
        }
    },

    editItems : (params, option) => {
        if(option.task == 'edit'){
            return MainModel.updateOne({ _id: params.id}, params.body)
        }
    },

}