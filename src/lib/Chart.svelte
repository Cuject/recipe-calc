<script>
    import { Pie } from 'svelte-chartjs';
    export let water   = 300;
    export let energy  = 50;
    export let protein = 100;
    export let fat     = 40;
    export let carb    = 120;
    export let ash     = 10;
    export let fiber   = 40;
    export let sugar   = 70;


    const data = {
        labels: ['Water', 'Energy', 'Protein', 'Total Fat', 'Carbohydrates', 'Ash', 'Fiber', 'Sugars'],
        datasets: [
            {
            data: [water, energy, protein, fat, carb, ash, fiber, sugar],
            backgroundColor: [
                '#F7464A',
                '#46BFBD',
                '#FDB45C',
                '#949FB1',
                '#4D5360',
                '#AC64AD',
            ],
            hoverBackgroundColor: [
                '#FF5A5E',
                '#5AD3D1',
                '#FFC870',
                '#A8B3C5',
                '#616774',
                '#DA92DB',
            ],
            
            },
        ],
    };
  
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      CategoryScale,
    } from 'chart.js';
  
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
  </script>
  
  <Pie {data} options={{ responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Nutrient Distribution Pie Chart'
      }
    } }} />


