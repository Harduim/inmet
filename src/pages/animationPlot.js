import React, { useState } from 'react'
import Plot from 'react-plotly.js'

export const AnimationPlot = () => {
  const [data, setData] = useState([10, 20, 30])
  const [layout, setLayout] = useState({ height: 500, width: 500 })
  const [config, setConfig] = useState({})
  const [frame, setFrame] = useState({})
  const [revision, setRevision] = useState(0)

  const propData = [
    {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [10, 20, 30],
      type: 'bar',
      tag: 'initial'
    },
    {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [-3, -5, -7],
      type: 'bar',
      tag: 'initial'
    }
  ]

  const newData = [...propData]
  const initiaData = propData.map((item) => {
    return {
      ...item,
      tag: 'initial',
      y: item.y.map((yvalue) => {
        return 0
      })
    }
  })
  const initializedata = () => {
    // set the initial value as zero in order to create animation

    console.log('below is initial data')
    console.log(initiaData)
    const newlayout = {
      ...layout,
      title: 'chart from initialized1',
      transition: {
        duration: 2000,
        easing: 'cubic-in-out'
      }
    }
    const newframe = {
      duration: 2000
    }

    setData(initiaData)
    setLayout(newlayout)
    setFrame(newframe)
  }

  const onInitialized = (figure) => {
    console.log('initialized')
    initializedata()
  }

  const onClick = () => {
    console.log('clicked parent')
    const newData = [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [Math.random(), Math.random(), Math.random()],
        type: 'bar'
      },
      {
        x: ['giraffes', 'orangutans'],
        y: [Math.random(), Math.random()],
        type: 'bar'
      }
    ]
    const newlayout = {
      ...layout,
      transition: {
        duration: 1000,
        easing: 'cubic-in'
      },
      title: 'updated'
    }
    const newframe = {
      duration: 1000
    }

    console.log(newlayout)

    setData(newData)
    setRevision(revision + 1)
  }

  const onTransitioning = (figure) => {
    console.log('on transition')
  }

  const onAfterPlot = (figure) => {
    console.log('onAfterPlot start')
    console.log(data.length)
    console.log(data[0])
    if (data.length === 0 || data[0].tag) {
      console.log('set state at after plot')
      const newData = propData
      console.log(layout)
      const newlayout = {
        ...layout,
        transition: {
          duration: 2000,
          easing: 'cubic-in-out'
        },
        // configure autorange to true for layout change
        xaxis: { ...layout.xaxis, autorange: true },
        yaxis: { ...layout.yaxis, autorange: true },
        title: 'after plot title'
      }

      console.log('revision')
      console.log(revision)

      setData(newData)
      setLayout(newlayout)
      setFrame({ duration: 2000 })
      console.log(layout.title)
    }
  }

  const onRelayout = () => {
    console.log('relayout')
  }
  const onupdate = () => {
    if (data.length > 0) {
      return
    }
    console.log('onupdate')
  }

  return (
    <section style={{ textAlign: 'center' }}>
      <button onClick={onClick}>Animate</button>
      <Plot
        data={data}
        layout={layout}
        frame={frame}
        onInitialized={onInitialized}
        onupdate={onupdate}
        onClick={onClick}
        onTransitioning={onTransitioning}
        onAfterPlot={onAfterPlot}
        onRelayout={onRelayout}
        revision={revision}
      />
    </section>
  )
}
