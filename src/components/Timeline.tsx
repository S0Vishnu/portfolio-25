import '../styles/Timeline.css';
import { HandGesture, MileStoneIcon, Shape2 } from '../assets/svg/iconsSvg';
import { timelineData } from '../data/timelineData';

const Timeline = () => {
    return (
        <div className="timeline-page">
            {/* Top Section - Skills and Graphics */}
            <div className="timeline-top-section">
                {/* Stylized Person Graphic */}
                <div className="person-graphic">
                    <Shape2 />
                </div>

                {/* Hand Gesture Graphic - Rock on */}
                <div className="hand-graphic">
                    <HandGesture />
                </div>

                {/* Skill Labels */}
                <div className="skill-label pill-1">Front-End Alchemist</div>
                <div className="skill-label pill-2">Timeline Strategist</div>
                <div className="skill-label pill-3">Virtual Story Crafter</div>
                <div className="skill-label pill-4">Interface Stylist</div>
                <div className="skill-label pill-5 yellow-circle">Ui Designer</div>
                <div className="skill-label pill-6">Ux Designer</div>
            </div>

            {/* Bottom Section - Timeline */}
            <div className="timeline-bottom-section">
                <div className="timeline-container">
                    {timelineData.map((item, index) => (
                        <div
                            key={index}
                            className="timeline-item"
                        >
                            <div className="timeline-text">
                                <span className="timeline-date">{item.date}</span>
                                <span className="timeline-flag"><MileStoneIcon /></span>
                                <span className="timeline-location">{item.location}</span>
                            </div>
                            <div
                                className="timeline-image"
                                data-timeline-image={item.imageAlt}
                            >
                                <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="grayscale-image"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
