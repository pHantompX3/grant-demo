module.exports.handler = async (event, context) => {
  try {
    //throw new Error('This is an error case');
    return {
      statusCode: 200,
      body: 'Hello World',
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify (e),
    };
  }
};
