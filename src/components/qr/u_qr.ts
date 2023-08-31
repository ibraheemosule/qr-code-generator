import domToImage from "dom-to-image";

export async function downloadQr(type: string, title: string) {
  const qrContainer = document.getElementById("qrContainer");

  const format = {
    png: domToImage.toPng,
    svg: domToImage.toSvg,
    jpeg: domToImage.toJpeg,
  } as Record<string, (arg: Node | null) => Promise<string>>;

  try {
    const convert = await format[type](qrContainer);

    const downloadLink = document.createElement("a");

    downloadLink.href = convert;
    downloadLink.download = `${title}.${type}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  } catch (e) {
    console.log(e);
  }
}
