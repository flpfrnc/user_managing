import './Card.css'

export default function Card ({children} : any) {
    return (
        <div className="Card">
            <div className="Card__content">
                {children}
            </div>
        </div>
    )
}