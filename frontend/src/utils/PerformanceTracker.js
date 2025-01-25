class PerformanceTracker {
    static trackPageLoad() {
      if ('performance' in window) {
        const timing = performance.getEntriesByType('navigation')[0];
        return {
          loadTime: timing.loadEventEnd - timing.startTime,
          domInteractive: timing.domInteractive - timing.startTime,
          firstByte: timing.responseStart - timing.startTime
        };
      }
      return null;
    }
  
    static trackRenderTime(component) {
      const start = performance.now();
      return {
        component,
        renderTime: () => performance.now() - start
      };
    }
  
    static logPerformance(metric) {
      console.log(`Performance Metric: ${JSON.stringify(metric)}`);
      // In production, send to analytics service
    }
  }
  
  // Example usage in a component
  const renderTracker = PerformanceTracker.trackRenderTime('HeroSection');
  console.log(`Render time: ${renderTracker.renderTime()}ms`);