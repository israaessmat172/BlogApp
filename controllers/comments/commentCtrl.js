const createCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment created",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//single comment
const commentUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updateCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createCommentCtrl,
  commentUserCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
};
