const User = require("../../models/user-model");
const Note = require("../../models/notes-model");
const auth = require("../../sevices/auth-service");

exports.index = (req, res) => {
  const id = auth.getUserId(req);
  Note.find({ author: id })
    .populate("author", "username", "user")
    .then(notes => {
      return res.status(200).json({ notes: notes });
    })
    .catch(() => res.status(500).json());
};

exports.create = (req, res) => {
  const id = auth.getUserId(req);
  User.findOne({ _id: id }).then(user => {
    if (!user) return res.status(500).json();
    const note = new Note(req.body.note);
    note.author = user._id;
    note
      .save()
      .then(note => {
        return res.status(201).json({ note: note });
      })
      .catch(() => res.status(500).json());
  });
};

exports.update = (req, res) => {
  const id = auth.getUserId(req);
  User.findOne({ _id: id }).then(user => {
    const note = new Note(req.body.note);
    note.author = user._id;
    Note.findByIdAndUpdate({ _id: note._id }, note)
      .then(note => {
        return res.status(200).json({ note: note });
      })
      .catch(() => res.status(500).json());
  });
};

exports.remove = (req, res) => {
  const id = auth.getUserId(req);
  Note.findOne({ _id: req.params.id })
    .then(note => {
      if (!note) return res.status(404).json();
      if (note.author._id.toString() !== id)
        return res
          .status(403)
          .json({ message: "Not allowed to delete another user's note!" });
      Note.deleteOne({ _id: req.params.id })
        .then(() => res.status(204).json())
        .catch(() => res.status(500).json());
    })
    .catch(() =>
      res.status(404).json({ error: "could not find note by given id" })
    );
};

exports.show = (req, res) => {
  const id = auth.getUserId(req);
  Note.findOne({ _id: req.params.id }).then(note => {
    if (!note) return res.status(404).json();
    if (note.author._id.toString() !== id)
      return res
        .status(403)
        .json({ message: "Not allowed to see another user's note!" });
    return res.status(200).json({ note: note });
  });
};
