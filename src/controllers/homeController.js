
let getHomePage = (req, res) => {
    return res.render("homePage.ejs");
}

let testEjs = (req, res) => {
    return res.render("test/test.ejs");
}

module.exports = {
    getHomePage: getHomePage,
    testEjs: testEjs,
}