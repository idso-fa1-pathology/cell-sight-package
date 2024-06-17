from setuptools import setup, find_packages

setup(
    name='cell_detection',
    version='0.1',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    install_requires=[
        'ultralytics',
        'numpy',
        'opencv-python',
        'torch',
        # Add other dependencies here
    ],
)
