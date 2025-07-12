export class DeviceService {
  /** true, если это мобильный браузер */
  get isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
  }

  /** true, если это планшет (iPad или Android-планшет) */
  get isTablet(): boolean {
    return /iPad|Tablet/.test(navigator.userAgent);
  }

  /** true, если ни мобильник, ни планшет */
  get isDesktop(): boolean {
    return !this.isMobile && !this.isTablet;
  }
}
