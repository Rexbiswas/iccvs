import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useAdmissionModal } from '../context/AdmissionModalContext';
import { ArrowRight } from 'lucide-react';

const fullData = [
    { year: '2020', jobs: 35, demand: 100 },
    { year: '2025', jobs: 155, demand: 165 },
    { year: '2030', jobs: 240, demand: 240 }
];

const GrowthChart = () => {
    const svgRef = useRef();
    const containerRef = useRef();
    const [activeYear, setActiveYear] = useState('ALL'); // '2020', '2025', '2030', or 'ALL'
    const { openAdmissionModal } = useAdmissionModal();

    useEffect(() => {
        const renderChart = () => {
            if (!svgRef.current || !containerRef.current) return;
            
            const containerWidth = containerRef.current.clientWidth;
            if (containerWidth <= 0) return;

            const isDesktopView = window.innerWidth > 1024 && containerWidth > 900;
            const margin = {
                top: 60,
                right: isDesktopView && activeYear === 'ALL' ? 480 : 40,
                bottom: 60,
                left: 60
            };

            const width = Math.max(containerWidth - margin.left - margin.right, isDesktopView ? 400 : 280);
            const height = 330;

            const svg = d3.select(svgRef.current);
            svg.selectAll('*').remove();

            const totalWidth = width + margin.left + margin.right;
            const totalHeight = height + margin.top + margin.bottom;

            const g = svg
                .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const data = activeYear === 'ALL' ? fullData : fullData.filter(d => d.year === activeYear);

            // Scales
            const x0 = d3.scaleBand()
                .domain(data.map(d => d.year))
                .rangeRound([0, width])
                .paddingInner(activeYear === 'ALL' ? 0.2 : 0.4);

            const x1 = d3.scaleBand()
                .domain(['jobs', 'demand'])
                .rangeRound([0, x0.bandwidth()])
                .padding(0.05);

            const y = d3.scaleLinear()
                .domain([0, 250])
                .nice()
                .rangeRound([height, 0]);

            const colors = { jobs: '#2563EB', demand: '#EA580C' };

            // Add Gradients
            const defs = svg.append('defs');
            const blueGradient = defs.append('linearGradient').attr('id', 'blue-gradient').attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
            blueGradient.append('stop').attr('offset', '0%').attr('stop-color', colors.jobs);
            blueGradient.append('stop').attr('offset', '100%').attr('stop-color', '#1E40AF');

            const orangeGradient = defs.append('linearGradient').attr('id', 'orange-gradient').attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
            orangeGradient.append('stop').attr('offset', '0%').attr('stop-color', colors.demand);
            orangeGradient.append('stop').attr('offset', '100%').attr('stop-color', '#9A3412');

            // Grid lines
            g.append('g').attr('class', 'grid').attr('opacity', 0.1).call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(''));

            // Axes
            g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x0)).attr('font-size', '12px').attr('font-weight', '700').style('color', '#64748b');
            g.append('g').call(d3.axisLeft(y).ticks(5)).attr('font-size', '12px').style('color', '#64748b');

            // Bars
            const yearGroups = g.selectAll('.year-group').data(data).enter().append('g').attr('transform', d => `translate(${x0(d.year)},0)`);
            const barData = (d) => [{ key: 'jobs', value: d.jobs }, { key: 'demand', value: d.demand }];

            const bars = yearGroups.selectAll('rect')
                .data(d => barData(d))
                .enter().append('rect')
                .attr('x', d => x1(d.key))
                .attr('y', height)
                .attr('width', x1.bandwidth())
                .attr('height', 0)
                .attr('fill', d => d.key === 'jobs' ? 'url(#blue-gradient)' : 'url(#orange-gradient)')
                .attr('rx', 6)
                .style('cursor', 'pointer')
                .on('mouseover', function (event, d) {
                    d3.select(this).transition().duration(200).attr('opacity', 0.8).attr('transform', 'scale(1.05)').attr('transform-origin', `${x1(d.key) + x1.bandwidth() / 2} ${y(d.value)}`);
                })
                .on('mouseout', function () {
                    d3.select(this).transition().duration(200).attr('opacity', 1).attr('transform', 'scale(1)');
                });

            bars.transition()
                .duration(1200)
                .ease(d3.easeElasticOut.amplitude(1).period(0.4))
                .delay((d, i) => i * 150)
                .attr('y', d => y(d.value))
                .attr('height', d => height - y(d.value));

            // Labels on top
            yearGroups.selectAll('.label')
                .data(d => barData(d))
                .enter().append('text')
                .attr('class', 'label')
                .attr('x', d => x1(d.key) + x1.bandwidth() / 2)
                .attr('y', d => y(d.value) - 8)
                .attr('text-anchor', 'middle')
                .attr('font-size', '11px')
                .attr('font-weight', '900')
                .attr('fill', '#1e293b')
                .text(d => d.value)
                .style('opacity', 0)
                .transition()
                .duration(800)
                .delay((d, i) => 1000 + i * 100)
                .style('opacity', 1);

            // Annotations
            if (isDesktopView && activeYear === 'ALL') {
                const annotations = [
                    { val: 240, text: "Design is no longer a <span class='text-primary font-black uppercase tracking-tight'>\"hobby\"</span>; it is a serious career opportunity.", boxY: 60 },
                    { val: 165, text: "The <span class='text-primary font-black uppercase tracking-tight'>\"Orange Economy\"</span> is projected to need 20 lakh professionals by 2033.", boxY: 165 },
                    { val: 100, text: "India needs more <span class='text-primary font-black uppercase tracking-tight'>professional Designers</span>.", boxY: 270 }
                ];

                const annG = g.append('g').attr('class', 'annotations');
                
                // Chart area frame
                g.append('rect').attr('x', -5).attr('y', -5).attr('width', width + 10).attr('height', height + 10).attr('fill', 'none').attr('stroke', '#8B5CF6').attr('stroke-width', 2).attr('rx', 8).attr('opacity', 0.6);

                annotations.forEach((ann, i) => {
                    const targetX = width + 5;
                    const targetY = y(ann.val);
                    const boxX = width + 70;
                    const boxY = ann.boxY;

                    annG.append('path')
                        .attr('d', `M ${targetX},${targetY} L ${targetX + 30},${targetY} L ${targetX + 50},${boxY} L ${boxX},${boxY}`)
                        .attr('fill', 'none')
                        .attr('stroke', '#475569')
                        .attr('stroke-width', 1.5)
                        .style('opacity', 0)
                        .transition().duration(800).delay(1500 + i * 200).style('opacity', 0.4);

                    annG.append('circle').attr('cx', targetX).attr('cy', targetY).attr('r', 4).attr('fill', '#475569').style('opacity', 0).transition().duration(500).delay(1500 + i * 200).style('opacity', 1);

                    const box = annG.append('g').attr('transform', `translate(${boxX}, ${boxY - 42})`).style('opacity', 0);
                    box.append('rect').attr('width', 300).attr('height', 85).attr('fill', 'white').attr('stroke', '#f1f5f9').attr('rx', 12).style('filter', 'drop-shadow(0 10px 15px rgba(0,0,0,0.05))');
                    box.append('rect').attr('width', 4).attr('height', 55).attr('y', 15).attr('fill', '#8B5CF6').attr('rx', 2);
                    
                    box.append('foreignObject').attr('x', 20).attr('y', 0).attr('width', 260).attr('height', 85).append('xhtml:div').style('height', '100%').style('display', 'flex').style('align-items', 'center').style('font-size', '12px').style('font-weight', '700').style('color', '#334155').style('line-height', '1.4').style('font-family', 'Inter, sans-serif').html(ann.text);
                    
                    box.transition().duration(800).delay(1800 + i * 200).style('opacity', 1);
                });
            }

            // Legend - Optimized for Mobile
            const isMobile = containerWidth < 600;
            const legend = svg.append('g').attr('transform', `translate(${margin.left}, 15)`);
            
            [{ label: 'Creative Industry Jobs (Millions)', color: colors.jobs }, { label: 'Design Education Demand (Index)', color: colors.demand }].forEach((item, i) => {
                const leg = legend.append('g')
                    .attr('transform', isMobile 
                        ? `translate(0, ${i * 18})` 
                        : `translate(${i * 230}, 0)`
                    );
                
                leg.append('rect').attr('width', 10).attr('height', 10).attr('fill', item.color).attr('rx', 2);
                leg.append('text')
                    .attr('x', 15)
                    .attr('y', 9)
                    .attr('font-size', '8px')
                    .attr('font-weight', '900')
                    .attr('fill', '#64748b')
                    .attr('letter-spacing', '0.05em')
                    .text(item.label.toUpperCase());
            });
        };``

        const timer = setTimeout(renderChart, 150);
        window.addEventListener('resize', renderChart);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', renderChart);
        };
    }, [activeYear]);

    return (
        <div ref={containerRef} className="w-full bg-white p-6 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2 pb-1">
                <div className="space-y-1">
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                        Demand for <span className="text-primary italic">Skill Doubling</span>
                    </h2>
                    <p className="text-sm text-gray-500 font-bold tracking-tight">
                        India is moving toward skill based education
                    </p>
                </div>

                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 shadow-inner">
                    {['2020', '2025', '2030', 'ALL'].map((yr) => (
                        <button
                            key={yr}
                            onClick={() => setActiveYear(yr)}
                            className={`px-4 md:px-6 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${activeYear === yr
                                    ? 'bg-white text-blue-600 shadow-md scale-105'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {yr === 'ALL' ? 'Overview' : yr}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative overflow-visible">
                <svg ref={svgRef} className="w-full h-auto" style={{ minHeight: '380px' }}></svg>
            </div>

            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="space-y-1 text-center sm:text-left">
                    <p className="text-sm md:text-base font-black uppercase tracking-tighter text-gray-900">
                        Join the <span className="text-primary italic">Creative Economy</span>
                    </p>
                </div>

                <button
                    onClick={() => openAdmissionModal()}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg hover:bg-primary transition-all duration-500 flex items-center justify-center gap-2 group"
                >
                    Apply Now
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default GrowthChart;


