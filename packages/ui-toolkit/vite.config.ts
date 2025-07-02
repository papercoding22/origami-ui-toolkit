import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@paper/ui-toolkit',
      fileName: (format) => `ui-toolkit.${format}.js`,
      formats: ['es', 'cjs'],
    },
    // We don't want to bundle React into our library.
    // The consumer of our library will have React installed.
    rollupOptions: {
      external: ['react', 'react-dom', '@chakra-ui/react', '@emotion/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
