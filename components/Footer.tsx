import router from 'next/router';
import React from 'react';

const Footer: React.FC = () => {
    
    return (
        <footer className="footer-1 py-4 sm:py-12">
            <div className="sm:flex flex-col sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t">
                <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full mx-auto w-20 md:h-[150px] md:w-[150px]" alt="Logo" />
            </div>
        </footer>
    );
}

export default Footer;
