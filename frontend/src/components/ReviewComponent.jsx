import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { addReview } from "../api/query/reviewQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function ReviewComponent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const [review, setReview] = useState("");
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState();

  const mutation = useMutation({
    mutationFn: addReview,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      handleClose();
      setIsSubmitting(false);
      setReview("");
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: () => {
      toast.error("Failed to submit the review.");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      bookId: id,
      comment: review,
    };

    mutation.mutate({ payload });
  };

  return (
    <React.Fragment>
      <div
        className="inline mt-6 text-white bg-[#ff6023] p-2 hover:shadow-xl rounded-lg"
        onClick={handleClickOpen}
      >
        Add Review
      </div>{" "}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
          sx: {
            width: "500px",
            maxWidth: "80%",
          },
        }}
      >
        <DialogTitle>Write Review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="review"
            label="Write your review.."
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setReview(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <button
            type="submit"
            className="bg-[#ff6023] text-white p-2 rounded rounded-lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}{" "}
          </button>{" "}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
