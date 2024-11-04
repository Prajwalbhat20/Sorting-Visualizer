const n=10;
const arr=[];


let audioCtx=null;

function playNote(freq)
{
      if(audioCtx==null)
      {
        audioCtx=new(
        AudioContext ||
        webkitAudioContext || window.webkitAudioContext
        )();

      }
      const dur=0.1;
      const osc=audioCtx.createOscillator();
      osc.frequency.value=freq;
      osc.start();
      osc.stop(audioCtx.currentTime+dur);
      const node=audioCtx.createGain();
      node.gain.value=0.1;
      osc.connect(node);
      osc.connect(audioCtx.destination);
}
 


function init()
{
    for(let i=0;i<n;i++)
        {
            arr[i]=Math.random();
        }
        showBars();
}

function play()
{
    init();
    const copy=[...arr]
    const swaps=bubbleSort(copy);
    animate(swaps);
    
}
function play1()
{
    init();
    const copy=[...arr]
    const swaps=SelectionSort(copy);
    animate(swaps);
    
}

function play2()
{
    init();
    const copy=[...arr]
    const swaps=InsertionSort(copy);
    animate(swaps);
    
}
function play3()
{
    init();
    const copy=[...arr]
    const swaps=MergeSort(copy);
    animate(swaps);
    
}
function play4()
{
    init();
    const copy=[...arr]
    const swaps=QuickSort(copy);
    animate(swaps);
    

}


function animate(swaps)
{
    if(swaps.length==0)
    {
        showBars();
        return;
    }
    const[i,j]=swaps.shift();
     [arr[i],arr[j]]=[arr[j],arr[i]];
     playNote(200+arr[i]*500);
     playNote(200+arr[i]*500);
     showBars([i,j]);
     setTimeout(function()
    {
        animate(swaps);
    },700);

    
}


function bubbleSort(arr){
    const swaps=[];
for(let i=0;i<n;i++)
{
    for(let j=i+1;j<n;j++)
    {
        if(arr[j]<arr[i])
        {
            swaps.push([i,j]);
            const temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
        }
    }
}
return swaps;
}

function SelectionSort(arr) {
    const swaps = [];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            swaps.push([i, minIndex]);
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    return swaps;
}



function InsertionSort(arr) {
    const swaps = [];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            swaps.push([j - 1, j]);
            const temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            j--;
        }
    }

    return swaps;
}


    

function QuickSort(arr) {
    const swaps = [];
    const n = arr.length;

    function partition(low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swaps.push([i, j]);
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        swaps.push([i + 1, high]);
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }

    function quickSort(low, high) {
        if (low < high) {
            const pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }

    quickSort(0, n - 1);
    return swaps;
}









function showBars(indices){
    container.innerHTML="";
for(let i=0;i<arr.length;i++)
{
   const bar=document.createElement("div");
   bar.style.height=arr[i]*100+"%";
   bar.classList.add("bar");
   if(indices && indices.includes(i))
   {
    bar.style.backgroundColor="red";
   }
   container.appendChild(bar);

}
}
console.log(container);