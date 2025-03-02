// UTILS
import { formatDate } from "src/utils/format";

// ICONS
import {
    FcHighPriority,
    FcLowPriority,
    FcMediumPriority,
} from "react-icons/fc";
import { MdOutlineDateRange, MdOutlineEmail } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";

// COMPONENTS
import Checkbox from "../Checkbox";

export default function CardPurchaseRequest({
    purchase,
    purchaseRequestSelected,
    handlePurchaseSelect,
}) {
    return (
        <div className="order-card">
            <div className="order-card-details">
                <Checkbox
                    id={`purchase-${purchase?._id}`}
                    checked={purchaseRequestSelected.includes(purchase)}
                    onChange={(e) =>
                        handlePurchaseSelect(e.target.checked, purchase)
                    }
                />
                <p className="order-card-description">
                    {purchase?.description}
                </p>
                <p>
                    <MdOutlineDateRange />
                    {formatDate(purchase?.requiredDate)}
                </p>
                <div className="order-card-priority-container">
                    {purchase?.priority === "Alta" ? (
                        <FcHighPriority />
                    ) : purchase?.priority === "Media" ? (
                        <FcMediumPriority />
                    ) : purchase?.priority === "Baja" ? (
                        <FcLowPriority />
                    ) : null}
                    <p
                        className={`order-card-priority ${
                            purchase?.priority === "Alta"
                                ? "order-card-priority-high"
                                : purchase?.priority === "Media"
                                ? "order-card-priority-medium"
                                : purchase?.priority === "Baja"
                                ? "order-card-priority-low"
                                : null
                        }`}
                    >
                        {purchase?.priority}
                    </p>
                    {purchase?.priority === "Alta" ? (
                        <FcHighPriority />
                    ) : purchase?.priority === "Media" ? (
                        <FcMediumPriority />
                    ) : purchase?.priority === "Baja" ? (
                        <FcLowPriority />
                    ) : null}
                </div>
                <a
                    className="order-card-email"
                    href={`mailto:${purchase?.user?.email}`}
                >
                    <MdOutlineEmail />
                    {purchase?.user?.email}
                </a>
            </div>
            <div className="order-card-articles">
                {purchase?.articles?.map((article, index) => (
                    <div key={index} className="order-card-article">
                        <p className="order-card-article-name">
                            {article?.name}
                        </p>
                        <p className="order-card-article-amount">
                            {article?.quantity}
                            <FaBoxes />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
