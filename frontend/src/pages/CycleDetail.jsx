import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaUser,
} from "react-icons/fa";
import Footer from "../components/Footer";
import "./CycleDetail.css";
import cycles from "../cyclesData";

function CycleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cycle = cycles.find((c) => c.id === Number(id));

  // Comments and ratings state
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      comment: "Amazing cycle! Great quality and performance.",
      date: "2024-01-15",
    },
    {
      id: 2,
      user: "Sarah Wilson",
      rating: 4,
      comment: "Very good cycle, comfortable to ride. Recommended!",
      date: "2024-01-10",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [userName, setUserName] = useState("");

  if (!cycle)
    return (
      <div className="cycle-not-found">
        <h2>Cycle not found</h2>
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    const comment = {
      id: comments.length + 1,
      user: userName,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split("T")[0],
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setUserName("");
    setNewRating(5);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  const averageRating =
    comments.reduce((sum, comment) => sum + comment.rating, 0) /
    comments.length;

  return (
    <div className="cycle-detail-container">
      <div className="cycle-detail">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Cycles
        </button>

        <div className="cycle-detail-content">
          <div className="cycle-detail-header">
            <h1 className="cycle-detail-title">{cycle.name}</h1>
            <p className="cycle-detail-price">${cycle.price}</p>
            <div className="cycle-detail-rating">
              <div className="rating-stars">{renderStars(averageRating)}</div>
              <span className="rating-text">
                {averageRating.toFixed(1)} ({comments.length} reviews)
              </span>
            </div>
          </div>

          <div className="cycle-detail-image-section">
            <img
              src={cycle.image}
              alt={cycle.name}
              className="cycle-detail-main-image"
            />
          </div>

          <div className="cycle-detail-description">
            <h3>Description</h3>
            <p>
              This is a high-quality cycle perfect for both casual rides and
              professional cycling. Built with premium materials and designed
              for comfort and performance.
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h2 className="comments-title">Reviews & Comments</h2>

          {/* Add Comment Form */}
          <div className="add-comment-form">
            <h3>Add Your Review</h3>
            <form onSubmit={handleSubmitComment}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <div className="rating-input">
                  <label>Rating:</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>
              <textarea
                placeholder="Write your review..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
                rows={4}
              />
              <button type="submit" className="submit-comment-btn">
                Submit Review
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-user">
                    <FaUser className="user-icon" />
                    <span className="user-name">{comment.user}</span>
                  </div>
                  <div className="comment-rating">
                    {renderStars(comment.rating)}
                  </div>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-text">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CycleDetail;
