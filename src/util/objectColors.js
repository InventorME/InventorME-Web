function colorGenerator(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        const color = {
            object: ['#ffb5b9', '#b3b5ff', '#47ff72', '#aebffc', '#b3b5ff','#ffb5b9', '#b3b5ff', '#47ff72'],
            fill: '#404040',
            background: '#333333',
            label: '#ffffff'
        }
        return color;
    }
    else{
        const color = {
            object: ['#ffb5b9', '#b3b5ff', '#47ff72', '#aebffc', '#b3b5ff','#ffb5b9', '#b3b5ff', '#47ff72'],
            fill: '#e6e6e6',
            background: '#333333',
            label: '#000000'
        }
        return color;
    }
}

export const colors = colorGenerator();