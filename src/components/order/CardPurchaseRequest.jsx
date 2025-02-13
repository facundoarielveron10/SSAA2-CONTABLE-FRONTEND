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
import Checkbox from "../Checkbox";

export default function CardPurchaseRequest({
    purchase,
    purchaseRequestSelected,
    handlePurchaseSelect,
}) {
    return (
        <div className="order-request">
            <div className="order-request-details">
                <Checkbox
                    id={`purchase-${purchase?._id}`}
                    checked={purchaseRequestSelected.includes(purchase?._id)}
                    onChange={(e) =>
                        handlePurchaseSelect(e.target.checked, purchase?._id)
                    }
                />
                <p className="order-request-description">
                    {purchase?.description}
                </p>
                <p>
                    <MdOutlineDateRange />
                    {formatDate(purchase?.requiredDate)}
                </p>
                <div className="order-request-priority-container">
                    {purchase?.priority === "Alta" ? (
                        <FcHighPriority />
                    ) : purchase?.priority === "Media" ? (
                        <FcMediumPriority />
                    ) : purchase?.priority === "Baja" ? (
                        <FcLowPriority />
                    ) : null}
                    <p
                        className={`order-request-priority ${
                            purchase?.priority === "Alta"
                                ? "order-request-priority-high"
                                : purchase?.priority === "Media"
                                ? "order-request-priority-medium"
                                : purchase?.priority === "Baja"
                                ? "order-request-priority-low"
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
                    className="order-request-email"
                    href={`mailto:${purchase?.user?.email}`}
                >
                    <MdOutlineEmail />
                    {purchase?.user?.email}
                </a>
            </div>
            <div className="order-request-articles">
                {purchase?.articles?.map((article, index) => (
                    <div key={index} className="order-request-article">
                        <p className="order-request-article-name">
                            {article?.name}
                        </p>
                        <p className="order-request-article-amount">
                            {article?.amount}
                            <FaBoxes />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
