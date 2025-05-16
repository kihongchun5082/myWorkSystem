export {};

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: {
          address: string;
          zonecode: string;
        }) => void;
      }) => {
        open: () => void; // ✅ open 메서드 포함
      };
    };
  }
}