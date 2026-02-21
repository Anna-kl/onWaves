import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loader-on-waves',
  templateUrl: './loader-on-waves.component.html',
  styleUrls: ['./loader-on-waves.component.scss']
})
export class LoaderOnWavesComponent implements AfterViewInit {

  @ViewChild('wavePath', { static: true }) wavePathRef!: ElementRef<SVGPathElement>;

  ngAfterViewInit(): void {
      const pathEl = this.wavePathRef.nativeElement;
      let t = 0;
  
      const animate = () => {
        const waveLength = 20;
        const baseAmp = 5;
        const crestAmp = 13;
        const crestSpeed = 0.3;
        const points: string[] = [];
  
        const crestCenter = (Math.sin(t * crestSpeed) + 1) * 30; // 0..100
  
        for (let x = 0; x <= 100; x += 2) {
          // Вычислим дополнительную амплитуду для гребня (локально)
          const crestInfluence = Math.exp(-Math.pow((x - crestCenter) / 5, 2)); // Гауссов пик
          const amp = baseAmp + crestAmp * crestInfluence;
  
          let y = 5 + Math.sin((x / waveLength + t) * Math.PI) * amp;
          // console.log(y);
          // y = y > 0 ? (-1)*y : 0;
          points.push(`${x},${y}`);
        }
  
        let d = `M${points[0]}`;
        for (let i = 1; i < points.length; i++) {
          d += ` L${points[i]}`;
        }
  
        pathEl.setAttribute('d', d);
        t += 0.02;
        requestAnimationFrame(animate);
      };
  
      animate();
    
    }
}
