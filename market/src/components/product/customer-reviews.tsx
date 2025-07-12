import React, { useState } from "react";
import { useLanguage } from "../../state/language-context";
import {
  StarIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

interface Review {
  id: string;
  customerName: string;
  customerNameHa: string;
  rating: number;
  title: string;
  titleHa: string;
  comment: string;
  commentHa: string;
  date: string;
  verified: boolean;
  helpful: number;
  location: string;
  locationHa: string;
}

interface CustomerReviewsProps {
  reviews?: Review[];
  productRating?: number;
  totalReviews?: number;
  className?: string;
}

const defaultReviews: Review[] = [
  {
    id: "1",
    customerName: "Fatima A.",
    customerNameHa: "Fatima A.",
    rating: 5,
    title: "Beautiful Traditional Craftsmanship",
    titleHa: "Kyawawan Aikin Sana'a na Gargajiya",
    comment:
      "This is exactly what I was looking for! The quality is exceptional and the traditional patterns are authentic. The artisan clearly has great skill.",
    commentHa:
      "Wannan shi ne abin da nake nema! Ingancin yana da kyau sosai kuma tsarin gargajiya na gaske ne. Gwanin ya sami fasaha sosai.",
    date: "2 days ago",
    verified: true,
    helpful: 12,
    location: "Kano, Nigeria",
    locationHa: "Kano, Najeriya",
  },
  {
    id: "2",
    customerName: "Ahmed S.",
    customerNameHa: "Ahmed S.",
    rating: 4,
    title: "Good Quality, Fast Delivery",
    titleHa: "Inganci Mai Kyau, Sauri na Isakuwa",
    comment:
      "Very satisfied with my purchase. The item arrived quickly and was well-packaged. The colors are vibrant and the craftsmanship is solid.",
    commentHa:
      "Na gamsu sosai da sayan da na yi. Kayan sun iso cikin sauri kuma an nannade su sosai. Launuka suna da kyau kuma aikin yana da kyau.",
    date: "1 week ago",
    verified: true,
    helpful: 8,
    location: "Kaduna, Nigeria",
    locationHa: "Kaduna, Najeriya",
  },
  {
    id: "3",
    customerName: "Zainab M.",
    customerNameHa: "Zainab M.",
    rating: 5,
    title: "Authentic and Beautiful",
    titleHa: "Na Gaske kuma Mai Kyau",
    comment:
      "I love supporting local artisans and this product exceeded my expectations. The attention to detail is remarkable and it's clear this was made with care.",
    commentHa:
      "Ina son tallafawa gwanaye na gida kuma wannan kaya ya wuce tsammani. Hankalin da aka yi a cikakken bayanai yana da ban mamaki kuma a bayyane yake an yi shi da kulawa.",
    date: "2 weeks ago",
    verified: true,
    helpful: 15,
    location: "Abuja, Nigeria",
    locationHa: "Abuja, Najeriya",
  },
];

const StarRating: React.FC<{ rating: number; size?: "sm" | "md" | "lg" }> = ({
  rating,
  size = "sm",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.floor(rating) ? (
          <StarIconSolid
            key={star}
            className={`${sizeClasses[size]} text-yellow-400`}
          />
        ) : (
          <StarIcon
            key={star}
            className={`${sizeClasses[size]} text-gray-300`}
          />
        )
      )}
    </div>
  );
};

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews = defaultReviews,
  productRating = 4.8,
  totalReviews = 156,
  className = "",
}) => {
  const { language } = useLanguage();
  const [sortBy, setSortBy] = useState<"newest" | "helpful" | "rating">(
    "newest"
  );

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful;
      case "rating":
        return b.rating - a.rating;
      case "newest":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 57 },
    { stars: 4, count: 42, percentage: 27 },
    { stars: 3, count: 18, percentage: 12 },
    { stars: 2, count: 5, percentage: 3 },
    { stars: 1, count: 2, percentage: 1 },
  ];

  return (
    <div className={`bg-white ${className}`}>
      {/* Reviews Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-drab-dark-brown">
            {language === "ha" ? "Ra'ayoyin Abokan Ciniki" : "Customer Reviews"}
          </h2>
          <button className="text-primary hover:text-drab-dark-brown text-sm font-medium">
            {language === "ha" ? "Rubuta Ra'ayi" : "Write a Review"}
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <StarRating rating={productRating} size="md" />
            <span className="text-lg font-semibold text-drab-dark-brown">
              {productRating}
            </span>
            <span className="text-gray-600">
              ({totalReviews} {language === "ha" ? "ra'ayoyi" : "reviews"})
            </span>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="mt-4 space-y-2">
          {ratingDistribution.map((item) => (
            <div
              key={item.stars}
              className="flex items-center space-x-2 text-sm"
            >
              <span className="w-8 text-gray-600">{item.stars}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="w-8 text-gray-600">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-drab-dark-brown">
          {language === "ha" ? "Duk Ra'ayoyi" : "All Reviews"}
        </h3>
        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-600">
            {language === "ha" ? "Jeri da:" : "Sort by:"}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border border-secondary rounded px-3 py-1 focus:outline-none focus:border-primary"
          >
            <option value="newest">
              {language === "ha" ? "Sabuwar" : "Newest"}
            </option>
            <option value="helpful">
              {language === "ha" ? "Mafi Taimako" : "Most Helpful"}
            </option>
            <option value="rating">
              {language === "ha" ? "Mafi Daraja" : "Highest Rating"}
            </option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-8 last:border-b-0"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-lg">
                  {
                    (language === "ha"
                      ? review.customerNameHa
                      : review.customerName)[0]
                  }
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-drab-dark-brown">
                      {language === "ha"
                        ? review.customerNameHa
                        : review.customerName}
                    </span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {language === "ha" ? "Da aka tabbatar" : "Verified"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-600">
                    {language === "ha" ? review.locationHa : review.location}
                  </span>
                </div>

                <h4 className="font-medium text-drab-dark-brown mb-2">
                  {language === "ha" ? review.titleHa : review.title}
                </h4>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {language === "ha" ? review.commentHa : review.comment}
                </p>

                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                    <HandThumbUpIcon className="w-4 h-4" />
                    <span>{language === "ha" ? "Taimako" : "Helpful"}</span>
                    <span>({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                    <HandThumbDownIcon className="w-4 h-4" />
                    <span>
                      {language === "ha" ? "Ba taimako" : "Not helpful"}
                    </span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                    <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
                    <span>{language === "ha" ? "Amsa" : "Reply"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-drab-dark-brown transition-colors">
          {language === "ha" ? "Kara Ra'ayoyi" : "Load More Reviews"}
        </button>
      </div>
    </div>
  );
};
