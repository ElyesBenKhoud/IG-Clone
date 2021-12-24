import React, { useState } from "react";
import firebase from "firebase";
import { storage, db } from "./firebase";
import "./ImageUpload.css";
import { Input } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
//upload pic
const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  //using styles components
  const classes = useStyles();

  //handling input of img extension
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);

            // post image inside db
            db.collection("posts").add({
              imageUrl: url,
              caption: caption,
              username: username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <Input
        placeholder="Enter your title from here"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div>
        <input type="file" onChange={handleChange} />
        <Button
          className="imageupload__button"
          variant="contained"
          onClick={handleUpload}
        >
          Upload From here
        </Button>
      </div>

      <br />
    </div>
  );
};

export default ImageUpload;
