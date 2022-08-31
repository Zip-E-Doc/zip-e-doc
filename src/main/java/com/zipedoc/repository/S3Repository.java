package com.zipedoc.repository;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.zipedoc.service.DocumentService;
import com.zipedoc.service.dto.DocumentDataDTO;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.util.StreamUtils;

@Repository
public class S3Repository {

    private final AmazonS3 s3Client;
    private final String bucketName = "zcw-cohort8n3dot1";
    private final Logger logger = LoggerFactory.getLogger(DocumentService.class);

    public S3Repository() {
        this.s3Client = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
    }

    public String uploadObject(DocumentDataDTO data) {
        s3Client.putObject(bucketName, data.getKey(), data.getData());
        return String.valueOf(s3Client.getUrl(bucketName, data.getKey()));
    }

    public List<S3ObjectSummary> listObjects() {
        return new ArrayList<>(s3Client.listObjectsV2(bucketName).getObjectSummaries());
    }

    // adapted from https://codeflex.co/java-read-amazon-s3-object-as-string/
    public String getS3ObjectContentAsString(String key) {
        try (InputStream is = s3Client.getObject(new GetObjectRequest(bucketName, key)).getObjectContent()) {
            return StreamUtils.copyToString(is, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }
    //    public ByteArrayOutputStream downloadFile(String keyName) {
    //        try {
    //            S3Object s3object = s3Client.getObject(new GetObjectRequest(bucketName, keyName));
    //
    //            InputStream is = s3object.getObjectContent();
    //            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    //            int len;
    //            byte[] buffer = new byte[4096];
    //            while ((len = is.read(buffer, 0, buffer.length)) != -1) {
    //                outputStream.write(buffer, 0, len);
    //            }
    //
    //            return outputStream;
    //        } catch (IOException ioException) {
    //            logger.error("IOException: " + ioException.getMessage());
    //        } catch (AmazonServiceException serviceException) {
    //            logger.info("AmazonServiceException Message:    " + serviceException.getMessage());
    //            throw serviceException;
    //        } catch (AmazonClientException clientException) {
    //            logger.info("AmazonClientException Message: " + clientException.getMessage());
    //            throw clientException;
    //        }
    //
    //        return null;
    //    }
    //
    //    //downloading an object
    //    S3Object s3object = awsService.getObject(bucketName, "JavaTools/hello.txt");
    //    S3ObjectInputStream inputStream = s3object.getObjectContent();
    //        FileUtils.copyInputStreamToFile(inputStream, new File("/Users/user/Desktop/hello.txt"));
}
