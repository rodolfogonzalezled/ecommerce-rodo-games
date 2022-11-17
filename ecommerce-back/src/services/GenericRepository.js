export default class GenericRepository {
    constructor(dao,model){
        this.dao = dao;
        this.model = model;
    };

    getAll = async(params) => {
        return this.dao.getAll(params, this.model);
    };

    getBy = async(params) => {
        return this.dao.findOne(params, this.model);
    };

    save = async(data) => {
        return this.dao.save(data, this.model);
    };

    update = async(params, data) => {
        return this.dao.update(params, data, this.model);
    };

    delete = async(params) => {
        return this.dao.delete(params, this.model);
    };
};