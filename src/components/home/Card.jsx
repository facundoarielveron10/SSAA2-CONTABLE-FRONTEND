export default function Card({ title, description, url }) {
    return (
        <div className="home-card">
            <div className="home-card-iframe">
                <iframe
                    src={url}
                    title={title}
                    className="home-card-preview"
                    allowFullScreen
                />
                <div className="home-card-overlay"></div>
            </div>
            <h2 className="home-card-title">{title}</h2>
            <p className="home-card-description">{description}</p>
            <div className="home-card-button">
                <a href={url} className="button">
                    Ir a {title}
                </a>
            </div>
        </div>
    );
}
