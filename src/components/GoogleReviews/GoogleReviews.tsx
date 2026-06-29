import React from 'react';
import { Star } from 'lucide-react';
import styles from './GoogleReviews.module.css';

interface GoogleReviewsProps {
  dict: any;
}

export default function GoogleReviews({ dict }: GoogleReviewsProps) {
  const reviewsData = [
    {
      text: dict?.reviews?.rev1 || "CIO Logistics has been handling our entire international freight pipeline from Europe and China for over three years. Their customs brokerage team is unmatched in precision and speed.",
      author: dict?.reviews?.rev1Author || "Davros H.",
      src: dict?.reviews?.rev1Src || "Google Reviews · Verified",
      initial: "D"
    },
    {
      text: dict?.reviews?.rev2 || "When we need temperature-controlled pharmaceutical transit from Germany, CIO is our only choice. Not a single degree excursion on any shipment. Truly reliable partners.",
      author: dict?.reviews?.rev2Author || "Anahit S.",
      src: dict?.reviews?.rev2Src || "Google Reviews · Verified",
      initial: "A"
    },
    {
      text: dict?.reviews?.rev3 || "Outstanding communication and 24/7 transparency. Our account manager knows our routing constraints inside out and always solves potential bottlenecks before they happen.",
      author: dict?.reviews?.rev3Author || "Karen M.",
      src: dict?.reviews?.rev3Src || "Google Reviews · Verified",
      initial: "K"
    }
  ];

  const eyebrow = dict?.reviews?.eyebrow || "CLIENT FEEDBACK";
  const title = dict?.reviews?.title || "What Our Clients Say";
  const score = dict?.reviews?.score || "4.9";

  return (
    <section className={styles.section} id="reviews">
      <div className={styles.container}>
        
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.title}>{title}</h2>
          </div>
          
          <div className={styles.ratingBox}>
            <div className={styles.ratingScoreRow}>
              <span className={styles.ratingScore}>{score}</span>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFB800" stroke="#FFB800" />
                ))}
              </div>
            </div>
            <span className={styles.ratingSubtitle}>
              Based on 150+ verified Google & client reviews
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className={styles.grid}>
          {reviewsData.map((rev, idx) => (
            <div key={idx} className={styles.card}>
              <div>
                {/* Red Dash Accent */}
                <div className={styles.redDash}></div>
                
                <div className={styles.cardStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFB800" stroke="#FFB800" />
                  ))}
                </div>
                
                <p className={styles.text}>
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className={styles.authorRow}>
                <div className={styles.avatar}>{rev.initial}</div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{rev.author}</h4>
                  <span className={styles.sourceBadge}>
                    <span className={styles.googleDot}></span>
                    {rev.src}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className={styles.footerRow}>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Cio+Logistics+LLC+Nairi+Zaryan+22a,+Yerevan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.googleBtn}
          >
            <Star size={16} fill="#FFB800" stroke="#FFB800" />
            See all verified reviews on Google Maps
          </a>
        </div>

      </div>
    </section>
  );
}
