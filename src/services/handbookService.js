import db from "../models/index";

let createNewHandbookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check data from server", data)
            if (data.action === 'CREATE') {
                await db.Handbook.create({
                    name: data.nameHandbook,
                    description: data.description,
                    contentMarkdown: data.contentMarkdown,
                    contentHTML: data.contentHTML,
                    image: data.image,

                })
            } else if (data.action === 'EDIT') {
                let handbook = await db.Handbook.findOne({
                    where: { id: data.handbookId },
                    raw: false
                })
                if (handbook) {
                    handbook.name = data.nameHandbook;
                    handbook.description = data.description;
                    handbook.contentMarkdown = data.contentMarkdown;
                    handbook.contentHTML = data.contentHTML;
                    if (data.image) {
                        handbook.image = data.image;
                    }
                    handbook.updateAt = new Date();
                    await handbook.save();
                }
            }
            resolve({
                errCode: 0,
                message: "Save information of Handbook Successfully!"
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteHandbookService = (handbookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Handbook.findByPk(handbookId);
            if (user) {
                await db.Handbook.destroy({
                    where: { id: handbookId }
                });
                // let allUsers = getAllUser();  
                resolve({
                    errCode: 0,
                    message: `The Handbook is deleted!`
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `The Handbook isn't exist!`
                }) // return
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllHandbookService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("check dataAppointment", dataAppointment);

            let data = await db.Handbook.findAll(
                // { attributes: { exclude: ["image"] }, }
            );
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
                // console.log("hoi dan it check data node js", data)
            }
            resolve({
                errCode: 0,
                message: 'Ok',
                data
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailHandbookByIdService = (handbookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!handbookId) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                let data = await db.Handbook.findOne({
                    where: { id: handbookId },
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] }
                });

                // console.log("check data handbook", data)
                resolve({
                    errCode: 0,
                    message: 'Ok',
                    data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createNewHandbookService: createNewHandbookService,
    getAllHandbookService: getAllHandbookService,
    getDetailHandbookByIdService: getDetailHandbookByIdService,
    deleteHandbookService: deleteHandbookService,
}