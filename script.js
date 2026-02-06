const splash = document.getElementById('splash');
const homeContent = document.getElementById('home-content');
// 必须确保 HTML 里有这两个 ID 的标签
const feDisplacementMap = document.querySelector('feDisplacementMap');
const feTurbulence = document.querySelector('feTurbulence');

let frame = 0;
let isAnimating = false; // 防止重复点击

splash.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    // 1. 触发涟漪扭曲动画循环
    const rippleEffect = setInterval(() => {
        frame++;
        
        // 动态修改 SVG 滤镜参数
        // baseFrequency: 决定波纹的密集程度 (从 0.01 增加到 0.4)
        // scale: 决定扭曲的剧烈程度 (从 50 增加到 500)
        let freq = 0.01 + (frame * 0.01); 
        let scale = 50 + (frame * 10);
        
        feTurbulence.setAttribute('baseFrequency', freq.toString());
        feDisplacementMap.setAttribute('scale', scale.toString());
        
        // 动画持续约 40 帧 (约0.6秒)
        if (frame > 40) {
            clearInterval(rippleEffect);
            
            // 2. 隐藏欢迎页，显示主页
            splash.style.opacity = '0';
            splash.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                splash.style.display = 'none';
                homeContent.classList.remove('hidden');
                
                // 切换到白底黑字模式
                document.body.classList.add('light-mode');
                // 恢复鼠标指针
                document.body.style.cursor = 'auto';
            }, 500);
        }
    }, 16); // 16ms 约等于 60FPS
});