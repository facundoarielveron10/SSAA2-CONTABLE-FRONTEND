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
        <div className="purchase-request">
            <div className="purchase-request-details">
                <Checkbox
                    id={`purchase-${purchase?._id}`}
                    checked={purchaseRequestSelected.includes(purchase)}
                    onChange={(e) =>
                        handlePurchaseSelect(e.target.checked, purchase)
                    }
                />
                <p className="purchase-request-description">
                    {purchase?.description}
                </p>
                <p>
                    <MdOutlineDateRange />
                    {formatDate(purchase?.requiredDate)}
                </p>
                <div className="purchase-request-priority-container">
                    {purchase?.priority === "Alta" ? (
                        <FcHighPriority />
                    ) : purchase?.priority === "Media" ? (
                        <FcMediumPriority />
                    ) : purchase?.priority === "Baja" ? (
                        <FcLowPriority />
                    ) : null}
                    <p
                        className={`purchase-request-priority ${
                            purchase?.priority === "Alta"
                                ? "purchase-request-priority-high"
                                : purchase?.priority === "Media"
                                ? "purchase-request-priority-medium"
                                : purchase?.priority === "Baja"
                                ? "purchase-request-priority-low"
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
                    className="purchase-request-email"
                    href={`mailto:${purchase?.user?.email}`}
                >
                    <MdOutlineEmail />
                    {purchase?.user?.email}
                </a>
            </div>
            <div className="purchase-request-articles">
                {purchase?.articles?.map((article, index) => (
                    <div key={index} className="purchase-request-article">
                        <p className="purchase-request-article-name">
                            {article?.name}
                        </p>
                        <p className="purchase-request-article-amount">
                            {article?.quantity}
                            <FaBoxes />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
