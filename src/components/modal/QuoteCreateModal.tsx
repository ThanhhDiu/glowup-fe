import React, { useState } from "react";
import Modal from "../common/Modal";
import QuoteForm from "../quote/QuoteForm";
import { QuotationCard } from "../chat/QuotationCard";
import type { Quote } from "../../types/Quote";
import "./css/quote.css";

interface QuoteCreateModalProps {
    open: boolean;
    onClose: () => void;
}

const QuoteCreateModal: React.FC<QuoteCreateModalProps> = ({ open, onClose }) => {
    const [quote, setQuote] = useState<Quote>({
        serviceName: "Sửa máy lạnh",
        description: "",
        date: "",
        time: "",
        price: 0,
        notes: "",
    });

    return (
        <Modal open={open} onClose={onClose}>
            <div className="quote-modal">
                {/* LEFT: FORM */}
                <div className="quote-left">
                    <QuoteForm
                        quote={quote}
                        setQuote={setQuote}
                        onClose={onClose}
                    />
                </div>

                {/* RIGHT: PREVIEW */}
                <div className="quote-right">
                    <div className="preview-header-text" style={{ marginBottom: '24px' }}>
                        <div className="preview-title">XEM TRƯỚC BÁO GIÁ</div>
                        <div className="preview-sub">Giao diện khách hàng sẽ nhận</div>
                    </div>
                    <QuotationCard
                        serviceName={quote.serviceName}
                        description={quote.description}
                        price={quote.price}
                        previewMode={true}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default QuoteCreateModal;