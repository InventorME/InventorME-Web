function colorGenerator(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        const color = {
            object: ['#ffb5b9', '#b3b5ff', '#47ff72', '#aebffc', '#b3b5ff','#ffb5b9', '#b3b5ff', '#47ff72'],
            fill: '#979797',
            background: '#333333',
            label: '#000000'
        }
        return color;
    }
    else{
        const color = {
            object: ['#ffb5b9', '#b3b5ff', '#47ff72', '#aebffc', '#b3b5ff', '#ffb5b9', '#b3b5ff', '#47ff72'],
            fill: '#f2f2f2',
            background: '#ffffff',
            label: '#000000'
        }
        return color;
    }
}

export const colors = colorGenerator();