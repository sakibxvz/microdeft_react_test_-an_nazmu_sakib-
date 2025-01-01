import React from 'react';
import styles from './CourseCard.module.css';
import Button from './ui/button/Button';


interface Author {
    name: string;
    email: string;
}

interface CourseCardProps {
    id: number;
    title: string;
    description: string;
    badge_text: string;
    badge_color: string;
    instructor_name: string;
    image: string;
    author: Author;
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    description,
    badge_text,
    badge_color,
    image,
    author,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img  src={image} alt={title} className={styles.image} />
                {badge_text && (
                    <span
                        className={styles.badge}
                        style={{ backgroundColor: badge_color }}
                    >
                        {badge_text}
                    </span>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.author}>{author.name}</p>
                <p className={styles.description}>
                    {description.length > 90 ? `${description.substring(0, 90)}...` : description}
                </p>
                <Button variant="primary" className={styles.viewButton}>View Course</Button>
            </div>
        </div>
    );
};

export default CourseCard;
