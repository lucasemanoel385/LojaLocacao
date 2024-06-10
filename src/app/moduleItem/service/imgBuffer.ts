
export abstract class ImgBuffer {

  private criarImagemUrl(imagem: ArrayBuffer): string {
    // Converte os bytes da imagem para uma URL de dados
    const nome = "teste";
    const blob = new Blob([new Uint8Array(imagem)], { type: 'image/png' }); // Substitua pelo tipo de mídia correto

    // Cria um File com o Blob
    const arquivo = new File([blob], nome, { type: 'image/png' }); // Substitua pelo tipo de mídia correto
    const urlTemporary = URL.createObjectURL(blob);
    
    return urlTemporary;
  }

  public base64ToArrayBuffer(base64: string): string {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
  
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return this.criarImagemUrl(bytes.buffer);

  }
}
