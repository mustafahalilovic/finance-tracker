const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

router.post("/", authorization, async (req, res) => {
  try {

    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user] 
    ); 
  //if would be req.user if you change your payload to this:
    
  //   function jwtGenerator(user_id) {
  //   const payload = {
  //     user: user_id
  //   };
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/profile", authorization, async(req, res)=>{
  try {
    

    const data = await pool.query(
      "SELECT finance_value, finance_type, finance_name FROM finances WHERE user_id = $1",[
        req.user
      ]);
      const reverseData = data.rows.reverse().map(a=>a);
      res.json(data.rows);

  } catch (error) {
    console.error(error.message);
  }
})

router.post('/transaction', authorization, async (req,res)=>{
  try {

    const {
      finance_value,
      finance_type,
      finance_date,
      finance_name
    } = req.body;

    const addedData = await pool.query(
      "INSERT INTO finances (user_id, finance_value, finance_type, finance_date, finance_name) VALUES($1, $2, $3, $4, $5) RETURNING *",[
        req.user, finance_value, finance_type, finance_date, finance_name
      ]
    );

    res.json(addedData.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
})

router.post('/search', authorization, async(req,res)=>{
  try {

      const {name, value} = req.body;

      const queryy = `SELECT finance_value, finance_type, finance_name FROM finances WHERE ${name}='${value}'`;

      console.log(queryy);

      const searchedData = await pool.query(queryy);

      res.json(searchedData.rows);

  } catch (error) {
    console.error(error.message);
  }
})

module.exports = router;