const sendFacts = async (req, res) => {
  res.status(200).send(global.APIresponse);
  global.APIresponse = {};
};

export default sendFacts;
