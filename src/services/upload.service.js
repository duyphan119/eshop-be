const { promisify } = require("util");
const fs = require("fs");
// fs.unlink trả vè callback, dùng promisify để trả về promise
const unlinkAsync = promisify(fs.unlink);
const upload = async (files) => {
  try {
    let result = [];

    for (const file of files) {
      console.log({ file });
      result.push({ path: "/imgs/" + file.filename });
    }
    return { status: 200, data: { items: result } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const deleteFile = async (body) => {
  try {
    let path = __dirname.split("services")[0];
    let __promises = body.map((item) =>
      unlinkAsync(path + "/public" + item.path)
    );
    await Promise.all(__promises);
    return { status: 200, data: { message: `Data's deleted` } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { upload, deleteFile };
