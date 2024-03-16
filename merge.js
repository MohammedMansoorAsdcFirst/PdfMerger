import PDFMerger from 'pdf-merger-js';

const mergePdfs = async (p1, p2) => {
    const merger = new PDFMerger();

    await merger.add(p1);
    await merger.add(p2);

    let date = new Date().getTime();

    await merger.save(`public/${date}.pdf`);
    return date;
};

export default mergePdfs;
