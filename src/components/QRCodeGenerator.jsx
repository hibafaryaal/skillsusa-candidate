import { QRCodeSVG } from 'qrcode.react';

const SHARE_URL = 'https://hibafaryaal.github.io/skillsusa-candidate';

export default function QRCodeGenerator() {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="bg-white p-3 rounded-xl shadow-inner">
                <QRCodeSVG
                    value={SHARE_URL}
                    size={96}
                    fgColor="#0a2240"
                    includeMargin={false}
                />
            </div>
            <p className="text-xs text-gray-300 text-center leading-tight">
                Scan to share<br />this candidate portal
            </p>
        </div>
    );
}