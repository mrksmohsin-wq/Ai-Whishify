import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Mail,
  Smartphone,
  Eye,
  QrCode,
  Download,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { WishData } from '../../types/wish';

interface ShareWishModalProps {
  wish: WishData;
  onClose: () => void;
  onOpenPlayer: (previewMode: boolean) => void;
}

export const ShareWishModal: React.FC<ShareWishModalProps> = ({
  wish,
  onClose,
  onOpenPlayer,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPreviewLink, setCopiedPreviewLink] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrExpanded, setShowQrExpanded] = useState(false);

  const origin = window.location.origin;
  const shareableUrl = `${origin}/#w=${wish.id}`;
  const previewShareableUrl = `${origin}/#preview=${wish.id}`;

  useEffect(() => {
    QRCode.toDataURL(shareableUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#1e1b4b',
        light: '#ffffff',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('QR code error:', err));
  }, [shareableUrl]);

  const copyToClipboard = (text: string, isPreview: boolean = false) => {
    navigator.clipboard.writeText(text);
    if (isPreview) {
      setCopiedPreviewLink(true);
      setTimeout(() => setCopiedPreviewLink(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const shareText = `✨ I created a special animated greeting for you on AI Wishify! Open your experience here: ${shareableUrl}`;
  const encodedText = encodeURIComponent(shareText);

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `Special Greeting for ${wish.recipientName} ✨`
    )}&body=${encodedText}`;
  };

  const shareSMS = () => {
    window.location.href = `sms:?body=${encodedText}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-yellow-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Your Wish is Ready!</h2>
              <p className="text-xs text-white/90">
                Share this magical experience with {wish.recipientName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Main Shareable Link */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Official Recipient Link
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-300 rounded-2xl shadow-inner">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 bg-transparent px-3 py-1 text-xs text-slate-800 font-mono focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(shareableUrl, false)}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick Instant Share Channels */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Instant Share Channels
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={shareWhatsApp}
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs border border-emerald-200 flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={shareEmail}
                className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Email</span>
              </button>

              <button
                onClick={shareSMS}
                className="p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs border border-purple-200 flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <Smartphone className="w-5 h-5 text-purple-600" />
                <span>SMS</span>
              </button>
            </div>
          </div>

          {/* QR Code generator */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16 rounded-lg border bg-white p-1" />
              ) : (
                <QrCode className="w-12 h-12 text-slate-400" />
              )}
              <div>
                <span className="text-xs font-bold text-slate-900 block">Greeting QR Code</span>
                <span className="text-[11px] text-slate-500">
                  Scan with any phone camera to play
                </span>
              </div>
            </div>

            {qrCodeUrl && (
              <a
                href={qrCodeUrl}
                download={`wishify-${wish.recipientName}.png`}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download QR</span>
              </a>
            )}
          </div>

          {/* Section 6 Requirement: Preview-to-recipient option */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                Preview Link (for Friend / Test)
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">
                Test Mode
              </span>
            </div>
            <p className="text-[11px] text-amber-800/80 mb-2">
              Share this link with a trusted friend before the final send. Marked with a "Preview" banner and does not count as official delivery.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(previewShareableUrl, true)}
                className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/60 font-semibold text-xs flex items-center gap-1 shadow-xs"
              >
                {copiedPreviewLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPreviewLink ? 'Preview Link Copied!' : 'Copy Preview Link'}</span>
              </button>

              <button
                onClick={() => onOpenPlayer(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test Live Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => onOpenPlayer(false)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
          >
            <span>Play Final Sequence as Recipient</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
