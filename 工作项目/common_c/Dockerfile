#基于那个镜像
FROM 116.196.88.48/lzkj/lz-frontend-crmc:1.0.0-SNAPSHOT

COPY dist /usr/share/nginx/html/crmc/common

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
